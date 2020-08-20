import { EventEmitter } from 'events';


export default class Util {
    //封装 封装事件 触发器时间
    private static ee = new EventEmitter();
    static ee_on(eventName:string,func:any){
       this.ee.on(eventName,func)
    }
    static ee_emmit(eventName:string,args:any){
       this.ee.emit(eventName,args)
    }

    static saveLiu(interval:number,fun:Function){

    }
}