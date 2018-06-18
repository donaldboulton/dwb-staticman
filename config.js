'use strict'

const convict = require('convict')
const path = require('path')

const schema = {
  akismet: {
    site: {
      doc: 'URL of an Akismet account used for spam checking.',
      docExample: 'https://donaldboulton.github.io/dwb-staticman/',
      format: String,
      default: null,
      env: 'AKISMET_SITE'
    },
    apiKey: {
      doc: 'API key to be used with Akismet.',
      format: String,
      default: null,
      env: 'AKISMET_API_KEY'
    }
  },
  analytics: {
    uaTrackingId: {
      doc: 'Universal Analytics account ID.',
      docExample: 'uaTrackingId: "UA-XXXX-XX"',
      format: String,
      default: null,
      env: 'UA_TRACKING_ID'
    }
  },
  email: {
    apiKey: {
      doc: 'Mailgun API key to be used for email notifications. Will be overridden by a `notifications.apiKey` parameter in the site config, if one is set.',
      format: String,
      default: null,
      env: 'EMAIL_API_KEY'
    },
    domain: {
      doc: 'Domain to be used with Mailgun for email notifications. Will be overridden by a `notifications.domain` parameter in the site config, if one is set.',
      format: String,
      default: 'https://donaldboulton.github.io/dwb-staticman/',
      env: 'EMAIL_DOMAIN'
    },
    fromAddress: {
      doc: 'Email address to send notifications from. Will be overridden by a `notifications.fromAddress` parameter in the site config, if one is set.',
      format: String,
      default: 'donaldboulton@gmail.com',
      env: 'EMAIL_FROM'
    }
  },
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  githubToken: {
    doc: 'Access token to the GitHub account being used to push files with.',
    format: String,
    default: null,
    env: 'GITHUB_TOKEN'
  },
  port: {
    doc: 'The port to bind the application to.',
    format: 'port',
    default: 0,
    env: 'PORT'
  },
  rsaPrivateKey: {
    doc: 'RSA private key to encrypt sensitive configuration parameters with.',
    docExample: 'rsaPrivateKey: "-----BEGIN RSA PRIVATE KEY-----\\nkey\\n-----END RSA PRIVATE KEY-----"',
    format: String,
    default: null,
    env: 'RSA_PRIVATE_KEY'
  },
  sentryDSN: {
    doc: 'Sentry DSN',
    format: String,
    default: null,
    env: 'SENTRY_DSN'
  }
}

let config

try {
  config = convict(schema)

  const fileName = 'config.' + config.get('env') + '.json'

  config.loadFile(path.join(__dirname, fileName))
  config.validate()

  console.log('(*) Local config file loaded')
} catch (e) {

}

module.exports = config
module.exports.schema = schema