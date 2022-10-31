export class NotifyWhenReady {
    notify!: (message?: string) => void;
    whenReady: Promise<unknown>;

    constructor() {
        this.whenReady = new Promise(res =>
            this.notify = res
        );
    }
}

