export const colours = {
    obsidian: '#595959',
    indicolite: '#6e9bc4',
    rouge: '#dc0000',
    verditer: '#6bc59f',
    veridian: '#6bc59f',
    zaffre: '#6bc59f'
    , incarnadine: '#ae0023',
    watchet: '#aed6d8',
    canary: '#fff68d'
}
//https://beautifytools.com/excel-to-json-converter.php
export const xlsx = {
    "Git": [
        {
            "Desc1": "Git Version",
            "Command": "git --version",
            "Desc2": "To Know the Version"
        },
        {
            "Desc1": "Help",
            "Command": "git --help"
        },
        {
            "Desc1": "Stage Files",
            "Command": "git add .",
            "Desc2": "Stages All Files"
        },
        {
            "Desc1": "Stage a Single File inside a folder",
            "Command": "git add **/[filename]"
        },
        {
            "Desc1": "Unstage Files",
            "Command": "git reset",
            "Desc2": "Unstages All Files"
        },
        {
            "Desc1": "Unstage a Single File in Git inside a folder",
            "Command": "git reset **/[filename]",
            "Desc2": "to unstage a single file"
        },
        {
            "Desc1": "Stage a Single File",
            "Command": "git add package-lock.json",
            "Desc2": "pass the exact path of a file(src/App.js)"
        },
        {
            "Desc1": "Unstage a Single File in Git",
            "Command": "git reset package-lock.json",
            "Desc2": "pass the exact path of a file(src/App.js)"
        },
        {
            "Desc1": "Stash with Message",
            "Command": "git stash -m 'my stash'"
        },
        {
            "Desc1": "Stash",
            "Command": "git stash ",
            "Desc2": "to stash all changes"
        },
        {
            "Desc1": "Stash List",
            "Command": "git stash list",
            "Desc2": "To view stash list in Git"
        },
        {
            "Desc1": "Stash Show",
            "Command": "git stash show",
            "Desc2": "To view the stash commit changes"
        },
        {
            "Desc1": "Stash apply",
            "Command": "git stash apply stash@{0}",
            "Desc2": "To apply latest stash use {0} else you can pick from the stash list "
        },
        {
            "Desc1": "Stash Drop",
            "Command": "git stash drop",
            "Desc2": "will drop the stash@{0} (i.e first stash)"
        },
        {
            "Desc1": "Stash Drop particular Stash",
            "Command": "git stash drop stash@{1}",
            "Desc2": "will drop the selected stash"
        },
        {
            "Desc1": "Difference of what is changed but not staged",
            "Command": "git diff"
        },
        {
            "Desc1": "diff of what is staged but not yet commited",
            "Command": "git diff --staged"
        },
        {
            "Desc1": "Pull",
            "Command": "git pull",
            "Desc2": "pulls from current branch"
        },
        {
            "Desc1": "pull from specific branch",
            "Command": "git pull origin [branch name]",
            "Desc2": "pulls from specific branch"
        },
        {
            "Desc1": "Commit",
            "Command": "git commit -m 'commit message'"
        },
        {
            "Desc1": "Push",
            "Command": "git push",
            "Desc2": "pushes your commmited chnages"
        },
        {
            "Desc1": "Status",
            "Command": "git status",
            "Desc2": "to know the status of files before commit "
        },
        {
            "Desc1": "Revert last taken pull",
            "Command": "git reset —keep HEAD@{1}"
        },
        {
            "Desc1": "Set the remote as upstream ",
            "Command": "git push —set-upstream origin branchname / git push -u origin branchname"
        },
        {
            "Desc1": "Discard modified files",
            "Command": "git checkout -f"
        },
        {
            "Desc1": "Discard untracked files",
            "Command": "git clean -fd"
        },
        {
            "Desc1": "Switch branch by creating new local branch",
            "Command": "git checkout -b Employee-Edit",
            "Desc2": "This will create a new branch in your local"
        },
        {
            "Desc1": "Delete Branch",
            "Command": "git branch -d Employee-Edit",
            "Desc2": "This will delete the branch in local"
        },
        {
            "Desc1": "Switch to the existing branch ",
            "Command": "git checkout Employee-Edit"
        },
        {
            "Desc1": "Head name",
            "Command": "git show Head"
        }
    ],
    "npm": [
        {
            "Desc1": "To get package.json",
            "Command": "npm init"
        },
        {
            "Desc1": "To get package.json",
            "Command": "npm init -y",
            "Desc2": "this will avoid naming each key "
        }
    ],
    "Cmd": [
        {
            "Desc1": "make directory",
            "Command": "mkdir [new foldername]"
        },
        {
            "Desc1": "to enter a directory",
            "Command": "cd [foldername]"
        },
        {
            "Desc1": "to make sub directotries",
            "Command": "mkdir [new foldername]/[new sub foldername]"
        },
        {
            "Desc1": "List",
            "Command": "ls"
        }
    ]
}