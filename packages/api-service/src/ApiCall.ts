export default class ApiCall<Input extends { [key: string]: any }, Output> {
    private callable: (parameters: Input) => Promise<Output>;
    private readonly defaultCall: Input
    constructor(
        callable: (parameters?: Input) => Promise<Output>,
        defaultCall?: Input
    ) {
        this.defaultCall = {} as Input;
        if (defaultCall) this.defaultCall = defaultCall;
        this.callable = callable;
    }

    async call(parameters: Input = this.defaultCall){
        return await this.callable(parameters);
    }
}