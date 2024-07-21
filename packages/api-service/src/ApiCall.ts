import { SupabaseClient } from "@supabase/supabase-js";

export default class ApiCall<Input extends { [key: string]: any }, Output> {
  private callable: (
    parameters: Input,
  ) => Promise<Output>;
  private readonly defaultCall: Input;
  private readonly configuration?: { [key: string]: any };
  constructor(
    callable: (parameters: Input) => Promise<Output>,
    configuration?: { [key: string]: any },
    defaultCall?: Input,
  ) {
    this.configuration = configuration;
    this.defaultCall = {} as Input;
    if (defaultCall) this.defaultCall = defaultCall;
    this.callable = callable;
  }

  async call(parameters: Input = this.defaultCall) {
    return await this.callable(parameters);
  }
}

// Définir un type helper pour extraire le type générique `Input` et 'Output'
export type ExtractInputType<T> = T extends ApiCall<infer I, any> ? I : never;
export type ExtractOutputType<T> = T extends ApiCall<any, infer O> ? O : never;
