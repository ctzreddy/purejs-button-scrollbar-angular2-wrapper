import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-responsive-scroll',
    templateUrl: './responsive-scroll.component.html',
    styleUrls: ['./responsive-scroll.component.scss']
})
export class AppResponsiveScrollComponent implements AfterViewInit {
    title = 'responsive-scroll';
    leftPaddle: any;
    rightPaddle: any;

    menuInvisibleSize: number;
    menuWrapperSize: number;
    menuSize: number;
    menuPosition: number;
    scrollDuration = 600;

    constructor(public element: ElementRef) {

    }

    public ngAfterViewInit(): void {
        // paddles
        this.leftPaddle = $('.left-paddle');
        this.rightPaddle = $('.right-paddle');

        // get items dimensions
        const itemsLength = $('.item').length;
        const itemSize = $('.item').outerWidth(true);

        // get some relevant size for the paddle triggering point
        const paddleMargin = 20;

        // get wrapper width
        const getMenuWrapperSize = function () {
            return $('.menu-wrapper').outerWidth();
        };

        this.menuWrapperSize = getMenuWrapperSize();
        // the wrapper is responsive
        $(window).on('resize', function () {
            this.menuWrapperSize = getMenuWrapperSize();
        });

        // size of the visible part of the menu is equal as the wrapper size
        const menuVisibleSize = this.menuWrapperSize;

        // get total width of all menu items
        const getMenuSize = function () {
            return itemsLength * itemSize;
        };
        this.menuSize = getMenuSize();
        // get how much of menu is invisible
        this.menuInvisibleSize = this.menuSize - this.menuWrapperSize;

        // get how much have we scrolled to the left
        const getMenuPosition = function () {
            return $('.menu').scrollLeft();
        };

        // finally, what happens when we are actually scrolling the menu
        const $select = $('.menu');
        $select.on('scroll', () => {

            // get how much of menu is invisible
            this.menuInvisibleSize = this.menuSize - this.menuWrapperSize;
            // get how much have we scrolled so far
            this.menuPosition = getMenuPosition();

            const menuEndOffset = this.menuInvisibleSize - paddleMargin;

            // show & hide the paddles
            // depending on scroll position
            if (this.menuPosition <= paddleMargin) {
                this.leftPaddle.addClass('hidden');
                this.rightPaddle.removeClass('hidden');
            } else if (this.menuPosition < menuEndOffset) {
                // show both paddles in the middle
                this.leftPaddle.removeClass('hidden');
                this.rightPaddle.removeClass('hidden');
            } else if (this.menuPosition >= menuEndOffset) {
                this.leftPaddle.removeClass('hidden');
                this.rightPaddle.addClass('hidden');
            }
        });
    }


    public rigthPaddleClick() {
        $('.menu').animate({ scrollLeft: this.menuInvisibleSize}, this.scrollDuration);
    }

    public leftPaddleClick(): void {
        $('.menu').animate({ scrollLeft: 0}, this.scrollDuration);
    }


}
