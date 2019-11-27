class GUIButton extends GUI {

    _text;
    _background;
    _rotation;
    _color;
    _fontSize;
    _height;
    _width;

    _onClick;
    _onHover;
    _onFocus;
    _onBlur;
    _focused = false;


    constructor ({ 
       id,
       text = 'button',
       background = '#000',
       y = Canvas.center.y,
       x = Canvas.center.x,
       rotation = 0,
       color = '#fff',
       fontSize = 18,
       height = 25,
       width = 150,
    } = {}) {
        super(); 

        if (id) this._id = id;
        this._text = text;
        this._background = background;
        this._y = y;
        this._x = x;
        this._rotation = rotation;
        this._color = color;
        this._fontSize = fontSize;
        this._height = height;
        this._width = width;
    }
    
    draw (timestamp) {
        super.draw(timestamp); 
        
        Canvas.createButton(
            {
                id: this._id,
                text: this._text,
                background: this._background,
                y: this._y,
                x: this._x,
                rotation: this._rotation,
                color: this._color,
                fontSize: this._fontSize,
                height: this._height,
                width: this._width,
            }, 
            () => this._click(), 
            e => this._hover(e)
        );
    }

    onClick(callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");
            
        this._onClick = callback;

        return this;
    }

    onHover(callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");

        this._onHover = callback;

        return this;
    }

    onFocus (callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");

        this._onFocus = callback;

        return this;
    }

    onBlur (callback) {
        if (typeof callback !== 'function') 
            throw Error("onBlur callback must be a function");

        this._onBlur = callback;

        return this;
    }

    _click () {
        this._onClick && this._onClick(this);
    }

    _hover (e = {}) {
        this._onHover && this._onHover(this);
        
        if (e.id && !this._focused) {
            this._focused = true;

            this._onFocus && this._onFocus(this);
        } else if (!e.id && this._focused) {
            this._focused = false;

            this._onBlur && this._onBlur(this);
        }
    }
}