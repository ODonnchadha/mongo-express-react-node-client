import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      clientSecret: '',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(`https://api.gitnub.com/users/
      ${username}/repos?per_page=${count}&sort=${sort}
      &client_id=${clientId}&client_secret=${clientSecret}`)
      .then(response => response.json()).then(data => {
        if (this.refs.LatestGitHubRepositories) {
          this.setState({
            repos: data
          });
        }
      }).catch(error => console.log(error));
  }

  render() {
    const { repos } = this.state;
    const respositories = repos.map(r => (
      <div key={r.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={r.html_url} className="text-info" rel="noopener noreferrer" target="_blank">
                {r.name}
              </Link>
            </h4>
            <p>
              {r.description}
            </p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {r.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {r.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {r.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="LatestGitHubRepositories">
        <hr />
        <h3 className="mb-4">Latest GitHub Repositories</h3>
        {respositories}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub;