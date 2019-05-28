/**
 * @file Server.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

/**
 * the response of the serverlist command for a single virtual server
 * @typedef {object} ServerListResponse
 * @property {number} virtualserver_id the current id of the virtual server
 * @property {...any} [any]
 */

const Abstract = require("./Abstract")

/**
 * Class representing a TeamSpeak Server
 * @extends Abstract
 * @property {number} id
 * @property {number} port
 * @property {string} status
 * @property {number} clientsonline
 * @property {number} queryclientsonline
 * @property {number} maxclients
 * @property {number} uptime
 * @property {string} name
 * @property {number} autostart
 * @property {string} machineId
 * @property {string} uniqueIdentifier
 */
class TeamSpeakServer extends Abstract {

  /**
   * Creates a TeamSpeak Server
   * @version 1.0
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ServerListResponse} list response from the serverlist command
   */
  constructor(parent, list) {
    super(parent, list, "virtualserver")
    this._static = {
      sid: list.virtualserver_id
    }
  }

  /**
     * Selects the Virtual Server
     * @version 1.0
     * @param {string} [client_nickname] - Set Nickname when selecting a server
     * @returns {Promise.<object>}
     */
  use(client_nickname) {
    return super.getParent().useBySid(this._static.sid, client_nickname)
  }


  /**
   * Gets basic Infos about the Server
   * @deprecated
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  getInfo() {
    return this.getCache()
  }


  /**
   * Deletes the Server.
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  del() {
    return super.getParent().serverDelete(this._static.sid)
  }


  /**
   * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  start() {
    return super.getParent().serverStart(this._static.sid)
  }


  /**
   * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @param {string} [msg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise.<object>}
   */
  stop(msg) {
    return super.getParent().serverStop(this._static.sid, msg)
  }

}

module.exports = TeamSpeakServer