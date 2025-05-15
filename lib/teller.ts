import axios from 'axios'
import fs from 'fs'
import path from 'path'
import https from 'https'

const tellerCert = fs.readFileSync(path.resolve(process.cwd(), 'teller/certificate.pem'))
const tellerKey = fs.readFileSync(path.resolve(process.cwd(), 'teller/private_key.pem'))

export const tellerClient = axios.create({
  baseURL: 'https://api.teller.io',
  httpsAgent: new https.Agent({
    cert: tellerCert,
    key: tellerKey,
  })
  // No default auth here!
}) 