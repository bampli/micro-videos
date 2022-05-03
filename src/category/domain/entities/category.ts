export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}
export class Category {
    constructor(public readonly props: CategoryProperties) {};

    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get created_at() {
        return this.props.created_at;
    }
}

// const category: Category = new Category({name: 'Movie'});

