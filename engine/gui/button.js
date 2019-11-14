class Button extends MonoBehaviour {

    _y;
    _x;
    _id;
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

    _targetAnimValues;
    _animSpeed;

    _focused = false;

    _animProgress = {};

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

        this._id = id;
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
    
    get name () {
        return this._id;
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
            (e) => this._hover(e)
        );

        this._animate();
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
            throw Error("this is not a function");

        this._onBlur = callback;

        return this;
    }

    animate (targetValues, speed = 1) {
        if (!Object.keys(targetValues).length) return

        this._targetAnimValues = targetValues;
        this._animSpeed = speed;
        this._animProgress = {};

        return this;
    }

    _animate () {
        if (!Object.keys(_targetAnimValues).length) return

        for (const property in this._targetAnimValues) {
            if (!this._animProgress[property] || this._animProgress[property] >= 1) {
                this._animProgress[property] = 0;
            }

            this._animProgress[property] += this._animSpeed * 0.1

            this[property] = 
                lerp(this[property], this._targetAnimValues[property], this._animProgress[property]);
        }
    }

    _click () {
        this._onClick && this._onClick(e);
    }

    _hover (e = {}) {
        this._onHover && this._onHover(e);
        
        if (e.id && !this._focused) {
            _focused = true;

            this._onFocus && this._onFocus(e);
        } else if (!e.id && this._focused) {
            _focused = false;

            this.onBlur && this.onBlur(e);
        }
    }
}