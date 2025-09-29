def gitlabSourceRepoHttpUrl
def gitlabSourceRepoName
def gitlabBranch
def pomVersion
def versionWithoutSnapshot

if (env.gitlabSourceRepoHttpUrl != null) {
    gitlabSourceRepoHttpUrl = env.gitlabSourceRepoHttpUrl
}

if (env.gitlabSourceRepoName != null) {
    gitlabSourceRepoName = env.gitlabSourceRepoName
}

if (env.gitlabBranch != null) {
    gitlabBranch = env.gitlabBranch
}

pipeline {
    agent { label 'main' }
    
    environment {
        IMAGE_NAME = "jdt16-fahri"
        IMAGE_TAG = "latest"
        CONTAINER_PORT = "3000"
        HOST_PORT = "8090"
        CONTAINER_REGISTRY= "issmdevops"
    }

    stages {

        stage('Code Release') {
            steps {

                script {
                showTraceLog()

                }

                git branch: "${gitlabBranch}", credentialsId: 'fahriwijayaa', url: "${gitlabSourceRepoHttpUrl}"
            }
        }
                        
                stage('Docker Build Image') {
            steps {
                                script {
                                        sh "docker build . -f Dockerfile -t ${CONTAINER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                                }
            }

            post {
                success {
                    updateGitlabCommitStatus name: 'Docker Build Image', state: 'success'
                }
                failure {
                    updateGitlabCommitStatus name: 'Docker Build Image', state: 'failed'
                }
            }
        }
                
                stage ('Deployment Docker') {
          steps{
                sh "docker stop ${IMAGE_NAME} || true"
                sh "docker rm ${IMAGE_NAME} || true"
                sh "docker run -d --name ${IMAGE_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${CONTAINER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
          }

            post {
             success {
                updateGitlabCommitStatus name: 'Deploy to k8s', state: 'success'
                     }
             failure {
                updateGitlabCommitStatus name: 'Deploy to k8s', state: 'failed'
              }
           }
        }

    }
}

def showTraceLog() {
    echo ">> [TRACE] Jenkins env BUILD_NUMBER is ${env.BUILD_NUMBER}"
    echo ">> [TRACE] Jenkins env BUILD_TAG is ${env.BUILD_TAG}"
    echo ">> [TRACE] Gitlab env gitlabBranch is ${env.gitlabBranch}"
    echo ">> [TRACE] Gitlab env gitlabSourceBranch is ${env.gitlabSourceBranch}"
    echo ">> [TRACE] Gitlab env gitlabActionType is ${env.gitlabActionType}"
    echo ">> [TRACE] Gitlab env gitlabUserName is ${env.gitlabUserName}"
    echo ">> [TRACE] Gitlab env gitlabUserUsername is ${env.gitlabUserUsername}"
    echo ">> [TRACE] Gitlab env gitlabUserEmail is ${env.gitlabUserEmail}"
    echo ">> [TRACE] Gitlab env gitlabSourceRepoHomepage is ${env.gitlabSourceRepoHomepage}"
    echo ">> [TRACE] Gitlab env gitlabSourceRepoName is ${env.gitlabSourceRepoName}"
    echo ">> [TRACE] Gitlab env gitlabSourceNamespace is ${env.gitlabSourceNamespace}"
    echo ">> [TRACE] Gitlab env gitlabSourceRepoURL is ${env.gitlabSourceRepoURL}"
    echo ">> [TRACE] Gitlab env gitlabSourceRepoSshUrl is ${env.gitlabSourceRepoSshUrl}"
    echo ">> [TRACE] Gitlab env gitlabSourceRepoHttpUrl is ${env.gitlabSourceRepoHttpUrl}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestTitle is ${env.gitlabMergeRequestTitle}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestDescription is ${env.gitlabMergeRequestDescription}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestId is ${env.gitlabMergeRequestId}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestIid is ${env.gitlabMergeRequestIid}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestState is ${env.gitlabMergeRequestState}"
    echo ">> [TRACE] Gitlab env gitlabMergedByUser is ${env.gitlabMergedByUser}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestAssignee is ${env.gitlabMergeRequestAssignee}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestLastCommit is ${env.gitlabMergeRequestLastCommit}"
    echo ">> [TRACE] Gitlab env gitlabMergeRequestTargetProjectId is ${env.gitlabMergeRequestTargetProjectId}"
    echo ">> [TRACE] Gitlab env gitlabTargetBranch is ${env.gitlabTargetBranch}"
    echo ">> [TRACE] Gitlab env gitlabTargetRepoName is ${env.gitlabTargetRepoName}"
    echo ">> [TRACE] Gitlab env gitlabTargetNamespace is ${env.gitlabTargetNamespace}"
    echo ">> [TRACE] Gitlab env gitlabTargetRepoSshUrl is ${env.gitlabTargetRepoSshUrl}"
    echo ">> [TRACE] Gitlab env gitlabTargetRepoHttpUrl is ${env.gitlabTargetRepoHttpUrl}"
    echo ">> [TRACE] Gitlab env gitlabBefore is ${env.gitlabBefore}"
    echo ">> [TRACE] Gitlab env gitlabAfter is ${env.gitlabAfter}"
    echo ">> [TRACE] Gitlab env gitlabTriggerPhrase is ${env.gitlabTriggerPhrase}"
}


