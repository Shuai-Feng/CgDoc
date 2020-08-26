import axios from 'axios';
import { Modal,message } from 'antd';

interface ajaxOption {
    url:string,
    data:{
        params?:any
        isLoading?:boolean
    }
}

export default class Axios {
    static ajax(options:ajaxOption){
        let baseApi:string ='https://www.fastmock.site/mock/5397d463a36505a10505c100b7e2a4fc/CgDoc'
        //对全局的loading进行配置
        //获取loading框的dom对象
        let loading: any;
        if(options.data && options.data.isLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response:any)=>{
                loading.style.display = 'none';
                if(response.status === 200){
                    let res:any = response.data;
                    if(res.code == 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:"出现了问题 放心 不是你的问题 "+res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            }).catch(error=>{
                message.info('出了点问题,放心不是你的问题'+error.message)
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none';
            })
        })
    };
}