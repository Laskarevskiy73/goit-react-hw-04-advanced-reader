import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Publication from './Publication';
import Counter from './Counter';
import Controls from './Controls';
import allPublication from './publication.json';
import popTransition from '../../transition/pop.module.css';

const parseQueryString = (currentPublication, startPublication) => {
  return currentPublication
    ? Number(queryString.parse(currentPublication).item)
    : Number(startPublication);
};

class Reader extends Component {
  static defaultProps = {
    history: PropTypes.shape({}),
    location: PropTypes.shape({}),
  };

  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
    location: PropTypes.shape({ search: PropTypes.string }),
  };

  state = {
    currentPublication: 1,
    publication: allPublication,
    animation: true,
  };

  componentDidMount() {
    const { currentPublication } = this.state;
    const { history, location } = this.props;
    const stringQuery = parseQueryString(location.search, currentPublication);

    if (stringQuery !== currentPublication) {
      this.setState({ currentPublication: stringQuery });

      history.push({
        ...location,
        search: `?item=${stringQuery}`,
      });

      return;
    }

    history.push({
      ...location,
      search: `?item=${currentPublication}`,
    });
  }

  componentDidUpdate(prevState) {
    const { currentPublication } = this.state;
    const { history, location } = this.props;
    const prevParseString = parseQueryString(prevState.location.search);

    if (prevParseString === currentPublication) {
      return;
    }

    history.push({
      ...location,
      search: `?item=${currentPublication}`,
    });

    this.animationState();
  }

  handleIncrement = () => {
    const parseString = parseQueryString(this.props.location.search);

    this.setState({ currentPublication: parseString - 1, animation: false });
  };

  handleDicrement = () => {
    const parseString = parseQueryString(this.props.location.search);

    this.setState({ currentPublication: parseString + 1, animation: false });
  };

  animationState = () => {
    this.setState({ animation: true });
  };

  render() {
    const { currentPublication, publication, animation } = this.state;

    return (
      <>
        <CSSTransition
          in={animation}
          timeout={600}
          classNames={popTransition}
          unmountOnExit
        >
          <Publication currentItem={publication[currentPublication - 1]} />
        </CSSTransition>
        <Counter
          currentItem={currentPublication}
          itemsLength={publication.length}
        />
        <Controls
          currentItem={currentPublication}
          itemsLength={publication.length}
          onIncrement={this.handleIncrement}
          onDicrement={this.handleDicrement}
        />
      </>
    );
  }
}

export default withRouter(Reader);
