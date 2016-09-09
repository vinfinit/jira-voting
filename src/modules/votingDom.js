/**
 * Created by vinfinit on 8/7/16.
 */

export default (function(document) {

    let votingList = [],
        votingWrapper = document.createElement('section'),
        votingContent = document.createElement('section'),
        votingTitle = document.createElement('div');

    return class VotingContainer {
        constructor(config) {
            let votingHeader = document.createElement('div'),
                votingClose = document.createElement('button'),
                votingMinimize = document.createElement('button'),
                votingMaximize = document.createElement('button');

            votingWrapper.className = 'voting-wrapper hide';
            votingHeader.className = 'voting-header';
            votingTitle.className = 'voting-title';
            votingContent.className = 'voting-content';
            votingClose.className = 'voting-close';
            votingMinimize.className = 'voting-minimize';
            votingMaximize.className = 'voting-maximize hide';

            votingTitle.innerHTML = `<span>${config.title || ''}</span>`;
            votingClose.innerHTML = '×';
            votingClose.onclick = () => {
                if (config.onClose) {
                    config.onClose();
                }
                votingWrapper.parentNode.removeChild(votingWrapper);
            };

            votingMinimize.innerHTML = '↙';
            votingMinimize.onclick = () => {
                votingContent.classList.add('hide');
                votingMinimize.classList.add('hide');
                votingMaximize.classList.remove('hide');
            };
            votingMaximize.innerHTML = '↖';
            votingMaximize.onclick = () => {
                votingContent.classList.remove('hide');
                votingMinimize.classList.remove('hide');
                votingMaximize.classList.add('hide');
            };

            votingHeader.appendChild(votingTitle);
            votingHeader.appendChild(votingMinimize);
            votingHeader.appendChild(votingMaximize);
            votingHeader.appendChild(votingClose);

            votingList.forEach(voting => votingContent.appendChild(voting));
            votingWrapper.appendChild(votingHeader);
            votingWrapper.appendChild(votingContent);

            document.body.appendChild(votingWrapper);
        }

        setTitle(title) {
            votingTitle.innerHTML = title;
        }

        pushSection(title, description, cb) {
            let votingSection = document.createElement('div'),
                submitSection = document.createElement('div'),
                submitButton = document.createElement('button');

            submitButton.onclick = () => cb(votingSection);
            submitButton.innerHTML =
                `<div class="voting-section-title">${title}</div>
                <div class="voting-section-description">${description}</div>`;
            submitSection.appendChild(submitButton);
            submitSection.className += ' voting-section-submit';
            votingSection.className = 'voting-item';

            votingWrapper.classList.remove('hide');

            votingSection.appendChild(submitButton);

            votingContent.appendChild(votingSection);
            votingList.push(votingSection);
            return this;
        }

        popSection() {
            let votingSection = votingList.pop();
            votingSection.parentNode.removeChild(votingSection);
            return this;
        }

        clear() {
            while (votingList.length) {
                this.popSection();
            }
        }

        getSection(index) {
            if (index >= votingList) {
                throw new Error('error with count')
            }
            return votingList[index];
        }
    }



}(document));