
export function joinAndCapitalize(arr: string[]): string {
  return arr
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
export const isoconverter = (dateString: string) => {
    const minutes = Math.floor((Date.now() - new Date(dateString).getTime())/60000)
            let finalresult = "Don't know"
            if(minutes < 1){
              finalresult = "Just now"
            }
            else if(minutes < 60){
              finalresult = `${minutes}m`
            }
            else if(minutes < 1440){
              const hours = Math.floor(minutes/60)
              finalresult = `${hours}h ago`
            }
            else{
              const days = Math.floor(minutes/1440)
              finalresult = `${days}d ago`
            }
            return finalresult
}

export function capitalizeWords(str:string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word =>
      word ? word[0].toUpperCase() + word.slice(1) : ""
    )
    .join(" ");
}
