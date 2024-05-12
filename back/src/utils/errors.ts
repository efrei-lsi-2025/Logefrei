export class InvalidOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidOperationError';
    }
}

export class RecordNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RecordNotFoundError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
