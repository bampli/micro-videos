#!/bin/sh

if [ $# -lt 2 ]; then
    echo "Use: new-entity entity-name-singular entity-name-plural [save]"
    exit 1
fi

SINGULAR=$1
PLURAL=$2

echo "-----------------------------------------------"
echo "Generating files for "$SINGULAR" (plural "$PLURAL") "$3
echo "-----------------------------------------------"

if [ $# -eq 2 ]
  then
    echo "Just checking commands with no changes."
    echo "-----------------------------------------------"
    #find ./src/nestjs/src/categories -name "*categories*" -exec bash -c 'echo mv "{}" "$(echo "{}" | sed 's/categories/''$PLURAL''/g' )"' \;
    #find ./src/nestjs/src/categories -name "*category*" -exec bash -c 'echo mv "{}" "$(echo "{}" | sed 's/category/''$SINGULAR''/g' )"' \;
    find ./src/@core/src/category -name "*category*" -exec bash -c 'echo mv "{}" "$(echo "{}" | sed 's/category/''$SINGULAR''/g' )"' \;
    exit 0
fi

if [ $3 = "save" ]
  then
    echo "Clear folders"
    [ -d "./src/@core/src/$SINGULAR" ] && rm -r ./src/@core/src/$SINGULAR
    #[ -d "./src/nestjs/src/$PLURAL" ] && rm -r ./src/nestjs/src/$PLURAL
    [ -d "./src/@core/dist" ] && rm -r ./src/@core/dist
    #[ -d "./src/nestjs/dist" ] && rm -r ./src/nestjs/dist
    echo "-----------------------------------------------"
    echo "Generate files"
    #cp -r ./src/nestjs/src/categories ./src/nestjs/src/$PLURAL
    cp -r ./src/@core/src/category ./src/@core/src/$SINGULAR
    echo "-----------------------------------------------"
    echo "Change files name"
    #find ./src/nestjs/src/$PLURAL -name "*categories*" -exec bash -c 'mv "{}" "$(echo "{}" | sed 's/categories/''$PLURAL''/g' )"' \;
    #find ./src/nestjs/src/$PLURAL -name "*category*" -exec bash -c 'mv "{}" "$(echo "{}" | sed 's/category/''$SINGULAR''/g' )"' \;
    find ./src/@core/src/$SINGULAR -name "*category*" -exec bash -c 'mv "{}" "$(echo "{}" | sed 's/category/''$SINGULAR''/g' )"' \;
    exit 0
fi

# After running the script, do some adjustments
# - Check & include entity at files listed below:
#       src/@core/.swcrc
#       src/@core/cti.sh
#       src/@core/src/package.json
#       src/@core/tsconfig.json
# - Node project name changed to @fc/cyclo-back
# - And finally run:
#   npm run cti:make -w @fc/cyclo-back
#   npm run build -w @fc/cyclo-back
