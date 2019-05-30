using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace websocket_sharp_demo
{
    public class Echo : WebSocketBehavior
    {
        //OnMessage接收前端传入的数据并进行相应的处理
        protected override void OnMessage(MessageEventArgs e)
        {
            var models = e.Data;
            //使用newtonsoft.json来处理前端传进来的Json数据
            JObject jo = (JObject)JsonConvert.DeserializeObject(e.Data);
            string name = jo["Name"].ToString();
            string msg = jo["Msg"].ToString();
            if (msg == "Login")
            {
                //Send将处理完的数据返回到前端
                Send(string.Format("\"{0}\" --> Connect OK!", name));
            }
            else
            {
                Send(string.Format("\"{0}\" say: {1}", name, msg));
            }
        }
    }
}
