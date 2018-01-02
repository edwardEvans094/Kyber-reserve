import React, { Component } from 'react';
import { connect } from "react-redux"
import TokenInfoView from "./tokenInfo.view"
import ApiService from "../../services/Connection/api.service"
import TokensService from "../../services/tokens"

@connect((store) => {
  const apiService = store.global.apiService
  return { apiService }
})

class TokenInfo extends Component {
  constructor() {
    super();
    this.tokensService = new TokensService()
    this.intervalFetchTokenData
    this.state = {
      data: {},
      moreInfo: {}
    }
  }
  componentDidMount(){
    this.syncAllTokenData()
    this.intervalFetchTokenData = setInterval(this.syncAllTokenData, 10000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalFetchTokenData)
  }

  syncAllTokenData = () => {
    this.tokensService.syncAll(this.props.apiService).then((tokens) => {
      this.setState({data: tokens})
    })
  }

  toggleShowMore = (tokenSymbol) => {
    this.setState((prevState, props) => {
      prevState.moreInfo[tokenSymbol] = !prevState.moreInfo[tokenSymbol]
      return {
        moreInfo: {...prevState.moreInfo}
      }
    })
  }

  render(){
    return (
        <TokenInfoView 
        data={this.state.data}
        moreInfo={this.state.moreInfo}
        toggleShowMore={this.toggleShowMore}
        /> 
    )
  }
}

export default TokenInfo;