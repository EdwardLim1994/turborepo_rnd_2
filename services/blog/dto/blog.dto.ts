export class BlogDTO {
	private _title?: string;

	public set title(title: string) {
		this._title = title;
	}

	public get title(): string | undefined {
		return this._title;
	}
}
