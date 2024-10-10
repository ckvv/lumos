import type { Llama, LLamaChatPromptOptions, LlamaContext, LlamaContextOptions, LlamaModel, LlamaModelOptions } from 'node-llama-cpp';
import path from 'node:path';
import { getLlama, LlamaChatSession, LlamaCompletion } from 'node-llama-cpp';
import { MODEL_PATH } from './config';

export * from 'node-llama-cpp';

export const defaultModel = {
  modelName: 'Qwen2.5-0.5B-Instruct.Q4_K_M',
  modelPath: path.join(MODEL_PATH, 'Qwen2.5-0.5B-Instruct.Q4_K_M.gguf'),
};

export class LlamaSingleton {
  static instance: LlamaSingleton;
  modelPath?: string;
  llama?: Llama;
  model?: LlamaModel;
  context?: LlamaContext;
  session?: LlamaChatSession;

  constructor() {
    this.init();
  }

  async init() {
    // this.getSession();
  }

  async getLlama() {
    if (this.llama && !this.llama.disposed) {
      return this.llama;
    }

    this.llama = await getLlama();
    return this.llama;
  }

  async getModel(options: LlamaModelOptions) {
    if (this.model && !this.model.disposed) {
      return this.model;
    }
    const llama = await this.getLlama();
    this.model = await llama.loadModel(options);
    return this.model;
  }

  async setModel(options: LlamaModelOptions) {
    if (this.model && !this.model.disposed) {
      await this.model.dispose();
    }
    const llama = await this.getLlama();
    this.model = await llama.loadModel(options);
    await this.getSession();
    return this.model;
  }

  async getContext(options?: LlamaContextOptions) {
    if (this.context && !this.context.disposed) {
      return this.context;
    }

    if (!this.model || this.model.disposed) {
      throw new Error('model is disposed');
    }

    this.context = await this.model.createContext(options);
    return this.context;
  }

  async getSession() {
    if (this.session && !this.session.disposed) {
      return this.session;
    }
    const context = await this.getContext();

    this.session = new LlamaChatSession({
      contextSequence: context.getSequence(),
    });
    return this.session;
  }

  async prompt(prompt: string, options?: LLamaChatPromptOptions) {
    const session = await this.getSession();
    return session.prompt(prompt, {
      temperature: 0.8,
      maxTokens: this.context?.contextSize,
      ...options,
    });
  }

  async completion(input: string) {
    const context = await this.getContext();
    const completion = new LlamaCompletion({
      contextSequence: context.getSequence(),
      autoDisposeSequence: true,
    });
    return completion.generateCompletion(input, {
      maxTokens: 100,
    });
  }

  async stop() {
    if (!this.session || this.session.disposed) {
      return;
    }
    return this.session.dispose();
  }
}

export const llamaSingleton = new LlamaSingleton();
