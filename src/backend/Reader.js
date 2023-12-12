const _data = require('./_data.js'); 

export function _getUsers () {
    return new Promise((resolve, reject) => {
      let persiststore = window.sessionStorage.getItem('employee-polls-users');
      if (persiststore) {
        resolve(JSON.parse(persiststore));
      }
      else {
        _data._getUsers().then((users) => {
            window.sessionStorage.setItem('employee-polls-users', JSON.stringify(users));
            resolve(users);
            }).catch(err => reject(err));
      }
    });
  }
  
  export function _getQuestions () {
    return new Promise((resolve, reject) => {
        let persiststore = window.sessionStorage.getItem('employee-polls-questions');
        if (persiststore) {
          resolve(JSON.parse(persiststore));
        }
        else {
          _data._getQuestions().then((questions) => {
              window.sessionStorage.setItem('employee-polls-questions', JSON.stringify(questions));
              resolve(questions);
              }).catch(err => reject(err));
        }
      });
  }

export function _saveQuestion(question) {
    let persiststore = window.sessionStorage.getItem('employee-polls-questions');
    if (persiststore) {
        _data.questions = JSON.parse(persiststore);
    }
    return new Promise((resolve, reject) => {
        _data._saveQuestion(question).then((question) => {
            window.sessionStorage.setItem('employee-polls-questions', JSON.stringify(_data.questions));
            resolve(question);
            }).catch(err => reject(err));
      });
}

export function _saveQuestionAnswer(answer) {
    let questionstore = window.sessionStorage.getItem('employee-polls-questions');
    if (questionstore) {
        _data.questions = JSON.parse(questionstore);
    }

    let userstore = window.sessionStorage.getItem('employee-polls-users');
    if (userstore) {
        _data.users = JSON.parse(userstore);
    }

    return new Promise((resolve, reject) => {
        _data._saveQuestion(answer).then((result) => {
            window.sessionStorage.setItem('employee-polls-questions', JSON.stringify(_data.questions));
            window.sessionStorage.setItem('employee-polls-users', JSON.stringify(_data.users));
            resolve(result);
            }).catch(err => reject(err));
      });
}