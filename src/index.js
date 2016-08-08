/**
 * Created by vinfinit on 8/7/16.
 */

import VotingDom from './modules/votingDom';

export default function() {

    let votingDom;

    class UserVoting {
        constructor(title) {
            votingDom = new VotingDom(title);
        }

        static module(path) {
            return UserVoting.register(path);
        }

        static register(path, module) {
            let modules = path.split('.'),
                curModule = UserVoting;

            for (let i = 0; i < modules.length; i++) {
                if (!curModule[modules[i]]) {
                    curModule[modules[i]] = {};
                }
                if (i === modules.length - 1 && module) {
                    curModule[modules[i]] = module;

                }
                curModule = curModule[modules[i]];
            }

            return curModule;
        }

        pushSection(title, description, cb) {
            votingDom.pushSection(title, description, cb);
            return this;
        }

        popSection() {
            votingDom.popSection();
            return this;
        }
    }

    return UserVoting;
};