pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'yarn'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Serve') {
      steps {
        sh 'yarn serve'
      }
    }

  }
}