import React, { Component } from 'react';



class KeybindingComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.onKey = this.onKey.bind(this);
        this.blacklistTargets = ['textarea', 'input', 'select'];
    }

    render() {
        return false;
    }

    onKey(e) {
        if(this.props.preventDefault) e.preventDefault();
        if(this.props.stopPropagation) e.stopPropagation();
        if(!(this.props.preventInputConflict && (e.target.tagName.toLowerCase().indexOf(this.blacklistTargets) > -1))) this.props.onKey(e);
    }

    componentDidMount() {
        if(typeof this.props.target === 'string') document.querySelector(this.props.target).addEventListener(this.props.type, this.onKey);
        else if(typeof this.props.target === 'object') this.props.target.addEventListener(this.props.type, this.onKey);
    }

    componentWillUnmount() {
        if(typeof this.props.target === 'string') document.querySelector(this.props.target).removeEventListener(this.props.type, this.onKey);
        else if(typeof this.props.target === 'object') this.props.target.removeEventListener(this.props.type, this.onKey);
    }
}

KeybindingComponent.defaultProps = {
    onKey                :  () => {},
    type                 : 'keydown',
    target               :  document,
    preventInputConflict :  false,
    preventDefault       :  false,
    stopPropagation      :  false
};

KeybindingComponent.propTypes = {
    onKey                : React.PropTypes.func,
    type                 : React.PropTypes.string,
    target               : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object ]),
    preventInputConflict : React.PropTypes.bool,
    preventDefault       : React.PropTypes.bool,
    stopPropagation      : React.PropTypes.bool
};

export default KeybindingComponent;
