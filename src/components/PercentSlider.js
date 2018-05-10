import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FieldRange from '@atlaskit/field-range';

const Container = styled.div`
  width: 500px;
`;


export default class PercentSlider extends PureComponent {
  state = {
    onChangeResult: 'Check & Uncheck to trigger onChange',
    rangeValue: 100,
  };

  onChange = (value) => {
    this.setState({
      onChangeResult: `onChange called with value: ${value}`,
      rangeValue: value,
    });
  };

  render() {
    return (
      <div>
        <Container>
          <FieldRange
            value={this.state.rangeValue}
            min={0.00}
            max={100.00}
            step={0.01}
            onChange={this.onChange}
          />
        </Container>
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          Range: 0.00-50.00. Step: 1. {this.state.onChangeResult}
        </div>
      </div>
    );
  }
}