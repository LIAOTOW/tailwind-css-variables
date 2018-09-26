module.exports = function(customVariableName) {
  return ({ addComponents, e, config }) => {
    const modules = config('modules', []);
    const { prefix } = config('options', []);
    const varModules = {
      colors: 'color',
      screens: '',
      fonts: 'font',
      textSizes: 'text',
      fontWeights: 'font',
      leading: 'leading',
      tracking: 'tracking',
      backgroundSize: 'bg',
      borderWidths: 'border',
      borderRadius: 'rounded',
      width: 'w',
      height: 'h',
      minWidth: 'min-w',
      minHeight: 'min-h',
      maxWidth: 'max-w',
      maxHeight: 'max-h',
      padding: 'p',
      margin: 'm',
      negativeMargin: 'nm',
      shadows: 'shadows',
      zIndex: 'z',
      opacity: 'opacity',
      ...customVariableName
    };
    let rootArray = {};
    Object.keys(varModules).forEach(key => {
      if ((key === 'colors' && varModules['colors']) || (key === 'screens' && varModules['screens']) || (varModules[key] && modules[key])) {
        const keyValue = config(key, []);
        const names = Object.keys(keyValue);
        const modulePrefix = varModules[key];
        names.forEach(name => {
          const varName = `-${prefix !== '' ? '-' + prefix : ''}${modulePrefix !== '' ? '-' + modulePrefix : ''}${
            name !== 'default' ? '-' + name : ''
          }`;
          rootArray[varName] = keyValue[name];
        });
      }
    });
    let root = {
      ':root': rootArray
    };
    addComponents(root);
  };
};
