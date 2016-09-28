#include <termio.h>
#include <stdio.h>
#include <node.h>
#include <v8.h>

using namespace v8;

void initTermianl(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  struct termios new_settings;
  struct termios stored_settings;
  tcgetattr(0,&stored_settings);
  new_settings = stored_settings;
  new_settings.c_lflag &= (~ICANON);
  new_settings.c_cc[VTIME] = 0;
  tcgetattr(0,&stored_settings);
  new_settings.c_cc[VMIN] = 1;
  tcsetattr(0,TCSANOW,&new_settings);
}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "initTermianl", initTermianl);
}

NODE_MODULE(core, init);