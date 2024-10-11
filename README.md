# lumos

在您的机器上本地运行 AI 模型

## 功能

+ 在计算机上本地运行 AI 模型
- 无需配置任何内容, MacOS 或者 Windosw 下载安装包直接使用
- 你可以自由的切换 GGUF 模型文件

## 使用

### 1.下载你对应机器的安装包
<https://github.com/ckvv/lumos/releases> 页面下载你对应机器的安装包

> 如果你未找到自己机器的安装包, 也可以选择源码构建构建
```shell
pnpm install
pnpm run build
```

### 2.获取 GGUF 模型

由于 GGUF 文件较大, 所以未内置到程序安装包,你可以在 Hugging Face 获取 GGUF 模型 <https://huggingface.co/models?library=gguf>

如果你不知道下载那个, 下面是几个推荐的:

+ [Qwen2.5-0.5B-Instruct.Q4_K_M](https://huggingface.co/mradermacher/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct.Q4_K_M.gguf?download=true)
+ [Qwen2.5-1.5B-Instruct](https://huggingface.co/mradermacher/Qwen2.5-1.5B-Instruct-GGUF/tree/main)
+ [Qwen2.5-7B-Instruct](https://huggingface.co/mradermacher/Qwen2.5-7B-Instruct-GGUF/tree/main)
+ [Llama-3.2-3B-Instruct-GGUF](https://huggingface.co/mradermacher/Llama-3.2-3B-Instruct-GGUF)
+ [LLaMA-3.1-8B-Instruct-KW-v2-GGUF](https://huggingface.co/mradermacher/LLaMA-3.1-8B-Instruct-KW-v2-GGUF/tree/main)

### 其他
# 产品截图

![初始化](./public/1.png)
![选择模型](./public/2.png)
![开启对话](./public/3.png)
![切换模型](./public/4.png)
