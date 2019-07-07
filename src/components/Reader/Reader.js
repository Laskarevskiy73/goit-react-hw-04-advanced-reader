import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Publication from './Publication';
import Counter from './Counter';
import Controls from './Controls';
import allPublication from './publication.json';

const parseQueryString = currentPublication => {
  return Number(queryString.parse(currentPublication).item);
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
  };

  componentDidMount() {
    const { currentPublication } = this.state;
    const { history, location } = this.props;

    history.push({
      ...location,
      pathname: '/reader',
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
  }

  handleIncrement = () => {
    const parseString = parseQueryString(this.props.location.search);

    this.setState({ currentPublication: parseString - 1 });
  };

  handleDicrement = () => {
    const parseString = parseQueryString(this.props.location.search);

    this.setState({ currentPublication: parseString + 1 });
  };

  render() {
    const { currentPublication, publication } = this.state;

    return (
      <>
        <div>Reader Page</div>

        <Publication currentItem={publication[currentPublication - 1]} />
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
