/**
 * Created by vinfinit on 8/7/16.
 */

export default (function(document) {

    let votingList = [],
        votingContent = document.createElement('section');

    return class VotingContainer {
        constructor(label) {
            let votingWrapper = document.createElement('section'),
                votingTitle = document.createElement('div');

            votingWrapper.className = 'voting-wrapper';
            votingTitle.className = 'voting-title';
            votingContent.className = 'voting-content';

            votingTitle.innerHTML = label;

            votingList.forEach(voting => votingContent.appendChild(voting));
            votingWrapper.appendChild(votingTitle);
            votingWrapper.appendChild(votingContent);

            document.body.appendChild(votingWrapper);
        }

        pushSection(title, description) {
            let votingSection = document.createElement('div');
            votingSection.innerHTML =
                `<div class="voting-section-title">${title}</div>
                <div class="voting-section-description">${description}</div>
                <div class="voting-section-submit"><button onclick="cb()">Vote</button></div>`;

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