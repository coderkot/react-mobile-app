# Сборка приложения для Android:

1. Перейти в директорию android/app/
2. Открыть build.gradle
3. Изменить номер версии и код версии
   android {
     ...

     defaultConfig {
       ...
       versionCode 4
       versionName "0.0.5.RC1"
   }
4. Закомментировать следующие блоки:
   - signingConfigs {
      //     comment for release
      debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
      }
   - buildTypes {
     //     comment for release
     debug {
       signingConfig signingConfigs.release
     }
   - release {
        signingConfig signingConfigs.debug
5. Раскомментировать
   release {
   ....
     signingConfig signingConfigs.release
6. В консоли выполнить из рута проекта cd android && gradlew bundleRelease
7. В директории android/app/build/outputs/bundle/release появится app-release.aab (этот файл выкладывается в Google Play Market)
8. Подробнее о сборке релиза можно почитать в официальной документации [React Native - Сборка релиза](https://reactnative.dev/docs/signed-apk-android)

# Настройка Gradle
Настройки Gradle для сборки проекта находятся в файле android/gradle.properties

org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=4096m -XX:+HeapDumpOnOutOfMemoryError - эта настройка отвечает за количество выделяемой оперативной памяти во время сборки

В файле android/build.gradle можно настроить поддерживаемые версии SDK Android для которых будет делаться сборка.

# Краш Metro во время запуска приложения в режиме debug:
Если во время запуска run android крашится run start, то необходимо почистить кэш gradle командой - cd android && gradlew clean.
Если после чистки кэша gradle ошибка осталась, можно запустить npm start --reset-cache
