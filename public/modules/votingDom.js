'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by vinfinit on 8/7/16.
 */

exports.default = function (document) {

    var votingList = [],
        votingContent = document.createElement('section'),
        votingTitle = document.createElement('div');

    return function () {
        function VotingContainer(label) {
            _classCallCheck(this, VotingContainer);

            var votingWrapper = document.createElement('section');

            votingWrapper.className = 'voting-wrapper';
            votingTitle.className = 'voting-title';
            votingContent.className = 'voting-content';

            votingTitle.innerHTML = label;

            votingList.forEach(function (voting) {
                return votingContent.appendChild(voting);
            });
            votingWrapper.appendChild(votingTitle);
            votingWrapper.appendChild(votingContent);

            document.body.appendChild(votingWrapper);
        }

        _createClass(VotingContainer, [{
            key: 'setTitle',
            value: function setTitle(label) {
                votingTitle.innerHTML = label;
            }
        }, {
            key: 'pushSection',
            value: function pushSection(title, description, cb) {
                var votingSection = document.createElement('div'),
                    submitSection = document.createElement('div'),
                    submitButton = document.createElement('button');

                submitButton.onclick = cb;
                submitButton.innerText = 'Vote';
                submitSection.appendChild(submitButton);
                submitSection.className += ' voting-section-submit';

                votingSection.innerHTML = '<div class="voting-section-title">' + title + '</div>\n                <div class="voting-section-description">' + description + '</div>';
                votingSection.appendChild(submitSection);

                votingContent.appendChild(votingSection);
                votingList.push(votingSection);
                return this;
            }
        }, {
            key: 'popSection',
            value: function popSection() {
                var votingSection = votingList.pop();
                votingSection.parentNode.removeChild(votingSection);
                return this;
            }
        }, {
            key: 'clear',
            value: function clear() {
                while (votingList.length) {
                    this.popSection();
                }
            }
        }, {
            key: 'getSection',
            value: function getSection(index) {
                if (index >= votingList) {
                    throw new Error('error with count');
                }
                return votingList[index];
            }
        }]);

        return VotingContainer;
    }();
}(document);