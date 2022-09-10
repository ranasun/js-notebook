export enum Events {
    RUN = 'run',
    REMOVE = 'remove',
    FOCUS = 'focus',
    SET_FOCUS = 'set-focus',
    MOVE_UP = 'move-up',
    MOVE_DOWN = 'moved-own'
}

export const EventEmitter = {
    events: <any>{},
    dispatch(event: Events, data?: any) {
      if (!this.events?.[event]) return;
      this.events[event].forEach((callback: any) => callback(data))
    },
    subscribe(event: Events, callback: (data?: any) => any) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(callback);
    },
    unsubscribe(event: Events) {
        if (!this.events[event]) return;
        delete this.events[event];
      }
  }