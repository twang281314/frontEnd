#include <node.h>
#include <v8.h>

float forfunc(){
  float i,j=0;
  for(i=0;i<10000000;i++){
 j += i/2;
  };
  return j;
}

void Method(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "world"));
}

void init(v8::Local<v8::Object> exports) {
  float j;
  j = forfunc();
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(hello, init);
