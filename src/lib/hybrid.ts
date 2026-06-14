import { exec } from 'kernelsu'
import { parse } from 'json5'
export async function run_hybird_api_command(subcommand: string) {
  const data = await exec("./hybrid-mount api " + subcommand,
    {cwd: "/data/adb/modules/hybrid_mount"})
  if (data.errno != 0) {
    console.error(data.stderr)
  } else {
  console.log(data.stdout)
  }
  try{
    const obj = parse(data.stdout)
    console.info(obj)
    return obj
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function run_hybird_daemon_status_command() {
  const data = await exec("./hybrid-mount daemon status",
    {cwd: "/data/adb/modules/hybrid_mount"})
  if (data.errno != 0) {
    console.error(data.stderr)
  } else {
  console.log(data.stdout)
  }
  try{
    const obj = parse(data.stdout)
    console.info(obj)
    return obj
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function run_hybird_api_command_open_url(url: string) {
  await exec("./hybrid-mount api open-url " + url,
    {cwd: "/data/adb/modules/hybrid_mount"})
    .then(() => {
      console.info("open url "+url)
    })
}
