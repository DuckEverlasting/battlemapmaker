class SpriteSheet extends ImageSource {
  public readonly spriteWidth: number;
  public readonly spriteHeight: number;
  public readonly rows: number;
  public readonly columns: number;

  constructor(source: HTMLImageElement, spriteWidth: number, spriteHeight: number) {
    super(source);
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.rows = Math.floor(this.height / spriteHeight);
    this.columns = Math.floor(this.width / spriteWidth);
  }
}