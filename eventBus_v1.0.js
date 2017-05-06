export class EventBus {
    static eventBus= new Array();

    static register(eventName,callback,callbacks) {
        var event=new Event(eventName);
        if(callback){
            event.addCallback(callback);
            return;
        }

        if(callbacks && callbacks.length>0){
            callbacks.forEach((callback)=>{
                EventBus.eventBus[eventName].addCallback(callback);
            });
        }
    }

    static unregister(eventName){
       delete EventBus.eventBus[eventName];
    }

    static callEvent(eventName,data){
        EventBus.eventBus[eventName].fire(data);
    }

    static reset(){
        EventBus.eventBus=[];
    }
}

class Event {
    static ID;
    constructor(id) {
        this.ID = id;
        this.callbacks=[];
    }

    addCallback(callback){
        this.callbacks.push(callback);
    }

    fire(data){
        for(var i=0;i<this._callbacks.length;i++){
            this.callbacks[i](data);
        }
    }
}
