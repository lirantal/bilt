const {describe, beforeEach} = require('mocha')
const {expect} = require('chai')
const path = require('path')
const replayGitRepo = require('./replay-git-repo')
const lastBuildInfo = require('../src/last-build-info')

describe('readLastBuildInfo and saveLastBuildInfo', () => {
  let gitDir

  beforeEach(async () => (gitDir = await replayGitRepo(path.join(__dirname, 'test-folder'))))

  it('should return undefined when no .bildit folder', async () => {
    expect(await lastBuildInfo.readLastBuildInfo(gitDir)).to.be.undefined
  })

  it('should enable saving and re-reading', async () => {
    await lastBuildInfo.saveLastBuildInfo(gitDir, {something: 4})
    console.log(gitDir)

    expect(await lastBuildInfo.readLastBuildInfo(gitDir)).to.deep.equal({something: 4})
  })
})