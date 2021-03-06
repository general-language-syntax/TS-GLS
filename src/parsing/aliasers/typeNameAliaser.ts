import { INodeAliaser } from "../../nodes/aliaser";

export class TypeNameAliaser implements INodeAliaser {
    private readonly typeName: string;

    public constructor(typeName: string) {
        this.typeName = typeName;
    }

    public getFriendlyTypeName(): string {
        return this.typeName;
    }
}
