/**
 * Created by vinfinit on 8/7/16.
 */

export default (function(document) {

    let votingSections = [];

    return class VotingContainer {
        constructor(label, sectionCount) {
            for (let i = 0; i < sectionCount; i++) {
                let votingSection = document.createElement('div');
                votingSection.id = `voting-section-${i}`;
                votingSections.push(votingSection);
            }

            let votingWrapper = document.createElement('section'),
                votingTitle = document.createElement('div'),
                votingContent = document.createElement('section');

            votingWrapper.className = 'voting-wrapper';
            votingTitle.className = 'voting-title';
            votingContent.className = 'voting-content';

            votingTitle.innerHTML = label;

            votingSections.forEach(voting => votingContent.appendChild(voting));
            votingWrapper.appendChild(votingTitle);
            votingWrapper.appendChild(votingContent);

            document.body.appendChild(votingWrapper);
        }

        getSection(index) {
            if (index >= votingSections) {
                throw new Error('error with count')
            }
            return votingSections[index];
        }
    }



}(document));