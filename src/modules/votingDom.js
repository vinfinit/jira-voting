/**
 * Created by vinfinit on 8/7/16.
 */

export default (function(document) {

    let votingList = [],
        votingContent = document.createElement('section'),
        votingTitle = document.createElement('div');

    return class VotingContainer {
        constructor(label) {
            let votingWrapper = document.createElement('section'),
                votingHeader = document.createElement('div'),
                votingClose = document.createElement('button');

            votingWrapper.className = 'voting-wrapper';
            votingHeader.className = 'voting-header';
            votingTitle.className = 'voting-title';
            votingContent.className = 'voting-content';
            votingClose.className = 'voting-close';

            votingTitle.innerHTML = `<span>${label}</span>`;
            votingClose.innerHTML = '×';
            votingClose.onclick = () => votingWrapper.parentNode.removeChild(votingWrapper);
            votingHeader.appendChild(votingTitle);
            votingHeader.appendChild(votingClose);

            votingList.forEach(voting => votingContent.appendChild(voting));
            votingWrapper.appendChild(votingHeader);
            votingWrapper.appendChild(votingContent);

            document.body.appendChild(votingWrapper);
        }

        setTitle(label) {
            votingTitle.innerHTML = label;
        }

        pushSection(title, description, cb) {
            let votingSection = document.createElement('div'),
                submitSection = document.createElement('div'),
                submitButton = document.createElement('button');

            submitButton.onclick = cb;
            submitButton.innerHTML =
                `<div class="voting-section-title">${title}</div>
                <div class="voting-section-description">${description}</div>`;
            submitSection.appendChild(submitButton);
            submitSection.className += ' voting-section-submit';
            votingSection.className = 'voting-item';


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