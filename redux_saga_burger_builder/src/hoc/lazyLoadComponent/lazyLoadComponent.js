import React, {Component} from 'react';

const lazyLoadComponent = (importedLazyLoadComp) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importedLazyLoadComp()
            .then(comp => {
                this.setState({
                    component: comp.default
                });
            });
        }

        render () {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null
        }
    }
}

export default lazyLoadComponent;