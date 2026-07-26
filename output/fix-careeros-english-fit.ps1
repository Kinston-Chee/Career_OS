param([Parameter(Mandatory=$true)][string]$Pptx)
$targets=@(
"Student evidence accumulates","Employer talent history accumulates",
"Institutional intelligence accumulates","Talent relationships expand",
"Value compounds","Increase retention"
)
function Fix($sh){
  if($sh.Type -eq 6){for($i=1;$i -le $sh.GroupItems.Count;$i++){Fix $sh.GroupItems.Item($i)};return}
  try{
    if($sh.HasTextFrame -eq -1 -and $sh.TextFrame.HasText -eq -1){
      $t=$sh.TextFrame.TextRange.Text.Trim()
      if($targets -contains $t){
        $sh.TextFrame.TextRange.Font.Size=11
        $sh.TextFrame.TextRange.ParagraphFormat.SpaceAfter=0
      }
    }
  }catch{}
}
$path=(Resolve-Path -LiteralPath $Pptx).Path
$app=New-Object -ComObject PowerPoint.Application
try{
  $p=$app.Presentations.Open($path,$false,$false,$false)
  try{
    $s=$p.Slides.Item(21)
    for($i=1;$i -le $s.Shapes.Count;$i++){Fix $s.Shapes.Item($i)}
    $p.Save()
  }finally{$p.Close()}
}finally{$app.Quit()}
