export class EventBus {
    static _eventBus= new Array();

    static register(eventName,callback,callbacks) {
        var event=new Event(eventName);
        if(callback){
            event.addCallback(callback);
            return;
        }

        if(callbacks && callbacks.length>0){
            callbacks.forEach((callback)=>{
                EventBus._eventBus[eventName].addCallback(callback);
            });
        }
    }

    static unregister(eventName){
       delete EventBus._eventBus[eventName];
    }

    static callEvent(eventName,data){
        EventBus._eventBus[eventName].fire(data);
    }

    static reset(){
        EventBus._eventBus=[];
    }
}

class Event {
    static ID;
   _callbacks;
    constructor(id) {
        this.ID = id;
        this._callbacks=new Array();
    }

    addCallback(callback){
        this._callbacks.push(callback);
    }

    fire(data){
        for(var i=0;i<this._callbacks.length;i++){
            this._callbacks[i](data);
        }
    }
}
