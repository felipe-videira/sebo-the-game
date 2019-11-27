class GUIText extends GUI {

    _text;
    _fontSize;
    _font;
    _type;
    _color;
    _textAlign;

    constructor ({ 
        id,
        text = "",
        y = Canvas.center.y,
        x = Canvas.center.x,
        fontSize = 30,
        color = "#000",
        font = 'Arial',
        type = 'fill' || 'stroke',
        textAlign = "center"
    } = {}) {
        super(); 
        
        if (id) this._id = id;
        this._text = text;
        this._y = y;
        this._x = x;
        this._fontSize = fontSize;
        this._color = color;
        this._font = font;
        this._type = type;
        this._textAlign = textAlign;
    }
    
    draw (timestamp) {
        super.draw(timestamp); 
        
        Canvas.displayText({
            text: this._text,
            x: this._x,
            y: this._y,
            fontSize: this._fontSize,
            color: this._color,
            font: this._font,
            type: this._type,
            textAlign: this._textAlign,
        });
    }
}