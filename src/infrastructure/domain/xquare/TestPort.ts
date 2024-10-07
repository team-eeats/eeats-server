export interface TestPort {

    validateOwner({ body }: { body: any });
}

export const TestPort = Symbol('ITestPort');
