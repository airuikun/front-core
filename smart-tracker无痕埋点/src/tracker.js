import extend from 'extend';
import {
    getEvent,
    getEventListenerMethod,
    getBoundingClientRect,
    stringify,
    getDomPath,
} from './utils'

const DefaultOptions = {
    useClass: false,
    per: 0.01,
    events: ['click'],
};

class Tracker {
    constructor() {
        this._isInstall = false;
        this._options = {};
    }

    config(options = {}) {
        options = extend(true, {}, DefaultOptions, options);
        options.event = DefaultOptions.event;
        this._options = options;
        return this;
    }

    _captureEvents() {
        const self = this;
        const events = this._options.events;
        const eventMethodObj = getEventListenerMethod();
        for (let i = 0, j = events.length; i < j; i++) {
            let eventName = events[i];
            document.body[eventMethodObj.addMethod](eventMethodObj.prefix + eventName, function (event) {
                const eventFix = getEvent(event);
                if (!eventFix) {
                    return;
                }
                self._handleEvent(eventFix);
            }, false)
        }
    }

    _handleEvent(event) {
        const per = parseFloat(this._options.per);
        if (!this.hit(per)) {
            return;
        }
        const domPath = getDomPath(event.target, this._options.useClass);
        const rect = getBoundingClientRect(event.target);
        if (rect.width == 0 || rect.height == 0) {
            return;
        }
        let t = document.documentElement || document.body.parentNode;
        const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
        const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
        const pageX = event.pageX || event.clientX + scrollX;
        const pageY = event.pageY || event.clientY + scrollY;
        const data = {
            domPath: encodeURIComponent(domPath),
            trackingType: event.type,
            offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
            offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
        };
        this.send(data);
    }

    send(data = {}) {
        console.log('data', data);
        const image = new Image(1, 1);
        image.onload = function () {
            image = null;
        };
        image.src = `/?${stringify(data)}`;
    }

    hit(per = 0.01) {
        return Math.random() < per;
    }

    install() {
        if (this._isInstall) {
            return this;
        }
        this._captureEvents();
        this._isInstall = true;
        return this;
    }
}

export default Tracker;