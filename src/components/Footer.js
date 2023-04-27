import React, { Component } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

export class Footer extends Component {
  render() {
    let styles = {
      fontSize: '2em',
      color: 'black',
      marginLeft: '.9rem',
    };
    return (
      <div>
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container text-center">
            <span className="text-muted">
              Made with ❤️ by Kamlesh-Joshi.
              <a style={styles} href="https://github.com/kamleshjoshi8102/Text-Analyzer">
                <AiOutlineGithub />
              </a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;